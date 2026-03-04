<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleStatus;
use App\Models\Category;
use App\Models\Comment;
use App\Notifications\CommentPostedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function dashboard(Request $request)
    {
        $publishedStatus = ArticleStatus::where('name', 'published')->first();
        
        $query = Article::where('status_id', $publishedStatus->id)
            ->with(['writer', 'category', 'comments' => function($query) {
                $query->with('student')->latest();
            }]);

        // Filter by category if selected
        if ($request->has('category_id') && $request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        $publishedArticles = $query->orderBy('created_at', 'desc')->get();

        $categories = Category::all();

        $myComments = Comment::where('student_id', Auth::id())
            ->with(['article', 'article.writer'])
            ->latest()
            ->get();

        return Inertia::render('Student/Dashboard', [
            'publishedArticles' => $publishedArticles,
            'myComments' => $myComments,
            'categories' => $categories,
            'selectedCategory' => $request->category_id
        ]);
    }

    public function publishedArticles(Request $request)
    {
        $publishedStatus = ArticleStatus::where('name', 'published')->first();
        
        $query = Article::where('status_id', $publishedStatus->id)
            ->with(['writer', 'category', 'comments' => function($query) {
                $query->with('student')->latest();
            }]);

        // Filter by category if selected
        if ($request->has('category_id') && $request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        $publishedArticles = $query->orderBy('created_at', 'desc')->get();

        $categories = Category::all();

        return Inertia::render('Student/PublishedArticles', [
            'publishedArticles' => $publishedArticles,
            'categories' => $categories,
            'selectedCategory' => $request->category_id
        ]);
    }

    public function myComments()
    {
        $myComments = Comment::where('student_id', Auth::id())
            ->with(['article', 'article.writer'])
            ->latest()
            ->get();

        return Inertia::render('Student/MyComments', [
            'myComments' => $myComments
        ]);
    }

    public function show(Article $article)
    {
        if (!$article->isPublished()) {
            abort(403, 'This article is not published yet.');
        }

        $article->load(['writer', 'category', 'comments' => function($query) {
            $query->with('student')->latest();
        }]);

        return Inertia::render('Student/ShowArticle', [
            'article' => $article
        ]);
    }

    public function comment(Request $request, Article $article)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:1000'
        ]);

        $comment = Comment::create([
            'article_id' => $article->id,
            'student_id' => Auth::id(),
            'content' => $validated['content']
        ]);

        // Notify article writer
        $article->writer->notify(new CommentPostedNotification($comment, $article));

        return redirect()->back()->with('success', 'Comment posted successfully!');
    }

    public function deleteComment(Request $request, Comment $comment)
    {
        // Check if the comment belongs to the current user
        if ($comment->student_id !== Auth::id()) {
            return redirect()->back()->with('error', 'You can only delete your own comments');
        }

        $comment->delete();
        return redirect()->back()->with('success', 'Comment deleted successfully!');
    }
}
