<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ArticlePolicy
{
    public function create(User $user): Response
    {
        return $user->hasRole('writer')
            ? Response::allow()
            : Response::deny('Only writers can create articles.');
    }

    public function update(User $user, Article $article): Response
    {
        return $user->id === $article->writer_id && $article->isDraft()
            ? Response::allow()
            : Response::deny('You can only edit your own draft articles.');
    }

    public function submit(User $user, Article $article): Response
    {
        return $user->id === $article->writer_id && $article->isDraft()
            ? Response::allow()
            : Response::deny('You can only submit your own draft articles.');
    }

    public function revise(User $user, Article $article): Response
    {
        return $user->id === $article->writer_id && $article->needsRevision()
            ? Response::allow()
            : Response::deny('You can only revise articles that need revision.');
    }

    public function review(User $user, Article $article): Response
    {
        return $user->hasRole('editor') && $article->isSubmitted()
            ? Response::allow()
            : Response::deny('Only editors can review submitted articles.');
    }

    public function requestRevision(User $user, Article $article): Response
    {
        return $user->hasRole('editor') && $article->isSubmitted()
            ? Response::allow()
            : Response::deny('Only editors can request revisions for submitted articles.');
    }

    public function publish(User $user, Article $article): Response
    {
        return $user->hasRole('editor') && $article->isSubmitted()
            ? Response::allow()
            : Response::deny('Only editors can publish submitted articles.');
    }

    public function view(User $user, Article $article): Response
    {
        if ($article->isPublished()) {
            return Response::allow();
        }

        if ($user->id === $article->writer_id) {
            return Response::allow();
        }

        if ($user->hasRole('editor') && $article->isSubmitted()) {
            return Response::allow();
        }

        return Response::deny('You cannot view this article.');
    }
}
