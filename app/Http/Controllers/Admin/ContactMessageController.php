<?php

namespace App\Http\Controllers\Admin;

use App\Domain\Contact\Repositories\ContactMessageRepository;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    public function __construct(protected ContactMessageRepository $repository) {}

    public function index(): Response
    {
        return Inertia::render('Admin/ContactMessages/Index', [
            'messages' => $this->repository->paginated(),
        ]);
    }

    public function markAsRead(int $id): RedirectResponse
    {
        $message = $this->repository->find($id);
        abort_if($message === null, 404);

        $this->repository->markAsRead($message);

        return back();
    }

    public function destroy(int $id): RedirectResponse
    {
        $message = $this->repository->find($id);
        abort_if($message === null, 404);

        $this->repository->delete($message);

        return back()->with('success', 'Mensagem removida.');
    }
}
