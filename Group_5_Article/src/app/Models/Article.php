<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'content',
        'status_id',
        'writer_id',
        'editor_id',
        'category_id'
    ];

    public function writer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'writer_id');
    }

    public function editor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'editor_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(ArticleStatus::class, 'status_id');
    }

    public function revisions(): HasMany
    {
        return $this->hasMany(Revision::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function isPublished(): bool
    {
        return $this->status->name === 'published';
    }

    public function isDraft(): bool
    {
        return $this->status->name === 'draft';
    }

    public function isSubmitted(): bool
    {
        return $this->status->name === 'submitted';
    }

    public function needsRevision(): bool
    {
        return $this->status->name === 'needs_revision';
    }
}
