<?php

namespace App\Http\Controllers;

use App\Models\SystemNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class SystemNotificationController extends Controller
{
    public function index(): JsonResponse
    {
        $systemNotifications = SystemNotification::whereUserId(Auth::user()->id)
            ->latest()
            ->get();

        return response()->json(
            $systemNotifications
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $systemNotification = SystemNotification::find($id);

        $systemNotification->delete();

        return response()->json([
            'data' => true
        ]);
    }

    public function markAsRead(string $id): JsonResponse
    {
        SystemNotification::whereId($id)
            ->update([
                'read_at' => now()
            ]);

        return response()->json([
            'data' => true
        ]);
    }
}
