<?php

namespace App\Services;

use Illuminate\Http\Request;

class BrowserLanguageService
{
    public function detectLanguage(Request $request)
    {
        $preferredLanguages = $request->getLanguages();
        $browserLanguage = reset($preferredLanguages);

        if (preg_match('/^([az]+)/i', $browserLanguage, $matches)) {
            $languageCode = strtolower($matches[1]);

            return  $languageCode;
        }
    }
}
