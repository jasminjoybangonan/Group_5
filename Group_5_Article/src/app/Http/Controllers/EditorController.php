<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Revision;
use App\Notifications\ArticlePublishedNotification;
use App\Notifications\RevisionRequestedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class EditorController extends Controller
{
    public function dashboard()
    {
        $pending = Article::where('status_id', 2) // Submitted status
            ->with(['writer', 'category', 'status'])
            ->get();

        $needsRevision = Article::where('status_id', 3) // Needs revision status
            ->with(['writer', 'category', 'status', 'revisions'])
            ->get();

        $published = Article::where('status_id', 4) // Published status
            ->where('editor_id', Auth::id())
            ->with(['writer', 'category', 'status'])
            ->get();

        return Inertia::render('Editor/Dashboard', [
            'pending' => $pending,
            'needsRevision' => $needsRevision,
            'published' => $published
        ]);
    }

    public function review(Article $article)
    {
        $this->authorize('review', $article);

        $article->load(['writer', 'category', 'status', 'revisions']);

        return Inertia::render('Editor/Review', [
            'article' => $article
        ]);
    }

    public function requestRevision(Request $request, Article $article)
    {
        $this->authorize('requestRevision', $article);

        $validated = $request->validate([
            'comments' => 'required|string'
        ]);

        $revision = Revision::create([
            'article_id' => $article->id,
            'editor_id' => Auth::id(),
            'comments' => $validated['comments']
        ]);

        $article->update([
            'status_id' => 3, // Needs revision status
            'editor_id' => Auth::id()
        ]);

        // Notify the writer
        $article->writer->notify(new RevisionRequestedNotification($article, $revision));

        return redirect()->route('editor.dashboard')->with('success', 'Revision request sent!');
    }

    public function publish(Article $article)
    {
        $this->authorize('publish', $article);

        $article->update([
            'status_id' => 4, // Published status
            'editor_id' => Auth::id()
        ]);

        // Notify the writer
        $article->writer->notify(new ArticlePublishedNotification($article));

        return redirect()->route('editor.dashboard')->with('success', 'Article published!');
    }
}
