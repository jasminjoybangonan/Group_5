<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Notifications\ArticleSubmittedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class WriterController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();
        $drafts = Article::where('writer_id', $user->id)
            ->where('status_id', 1) // Draft status
            ->with(['category', 'status'])
            ->get();

        $submitted = Article::where('writer_id', $user->id)
            ->where('status_id', 2) // Submitted status
            ->with(['category', 'status'])
            ->get();

        $needsRevision = Article::where('writer_id', $user->id)
            ->where('status_id', 3) // Needs revision status
            ->with(['category', 'status', 'revisions' => function($query) {
                $query->latest()->first();
            }])
            ->get();

        $published = Article::where('writer_id', $user->id)
            ->where('status_id', 4) // Published status
            ->with(['category', 'status'])
            ->get();

        $categories = Category::all();

        return Inertia::render('Writer/Dashboard', [
            'drafts' => $drafts,
            'submitted' => $submitted,
            'needsRevision' => $needsRevision,
            'published' => $published,
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Article::class);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id'
        ]);

        $article = Article::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'category_id' => $validated['category_id'],
            'writer_id' => Auth::id(),
            'status_id' => 1 // Draft status
        ]);

        return redirect()->back()->with('success', 'Article created successfully!');
    }

    public function update(Request $request, Article $article)
    {
        $this->authorize('update', $article);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id'
        ]);

        $article->update($validated);

        return redirect()->back()->with('success', 'Article updated successfully!');
    }

    public function submit(Article $article)
    {
        $this->authorize('submit', $article);

        $article->update(['status_id' => 2]); // Submitted status

        // Notify all editors
        $editors = \App\Models\User::role('editor')->get();
        Notification::send($editors, new ArticleSubmittedNotification($article));

        return redirect()->back()->with('success', 'Article submitted for review!');
    }

    public function revise(Request $request, Article $article)
    {
        $this->authorize('revise', $article);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id'
        ]);

        $article->update($validated);
        $article->update(['status_id' => 2]); // Resubmit after revision

        return redirect()->back()->with('success', 'Article revised and resubmitted!');
    }
}
