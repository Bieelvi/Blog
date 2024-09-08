<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostCommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'post_id' => ['required', 'exists:App\Models\Post,id'],
            'user_id' => ['required', 'exists:App\Models\User,id'],
            'comment' => ['required', 'string', 'min:1', 'max:65535'],
        ];
    }
}
