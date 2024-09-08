<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
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
        $rules = [
            'title' => ['required', 'string', 'min:5', 'max:50'],
            'resume' => ['required', 'string', 'min:20', 'max:510'],
            'article' => ['required', 'string', 'min:20', 'max:65535'],
        ];

        if ($this->method() == 'POST') {
            $rules['user_id'] = ['required', 'exists:App\Models\User,id'];
        }

        return $rules;
    }
}
