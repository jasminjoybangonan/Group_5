<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use App\Notifications\CommentPostedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function dashboard()
    {
        $publishedArticles = Article::where('status_id', 4) // Published status
            ->with(['writer', 'category', 'comments' => function($query) {
                $query->latest();
            }])
            ->orderBy('created_at', 'desc')
            ->get();

        $myComments = Comment::where('student_id', Auth::id())
            ->with(['article', 'article.writer'])
            ->latest()
            ->get();

        return Inertia::render('Student/Dashboard', [
            'publishedArticles' => $publishedArticles,
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
        $this->authorize('comment', [Comment::class, $article]);

        $validated = $request->validate([
            'content' => 'required|string|max:1000'
        ]);

        $comment = Comment::create([
            'article_id' => $article->id,
            'student_id' => Auth::id(),
            'content' => $validated['content']
        ]);

        // Notify the article writer
        $article->writer->notify(new CommentPostedNotification($comment, $article));

        return redirect()->back()->with('success', 'Comment posted successfully!');
    }
}
