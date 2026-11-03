<?php

namespace App\Domain\Contact\Repositories;

use App\Domain\Contact\Models\ContactMessage;

class ContactMessageRepository
{
    public function paginated(int $perPage = 20)
    {
        return ContactMessage::query()->latest()->paginate($perPage);
    }

    public function create(array $data): ContactMessage
    {
        return ContactMessage::query()->create($data);
    }

    public function find(int $id): ?ContactMessage
    {
        return ContactMessage::query()->find($id);
    }

    public function markAsRead(ContactMessage $message): void
    {
        $message->update(['is_read' => true]);
    }

    public function delete(ContactMessage $message): void
    {
        $message->delete();
    }
}
