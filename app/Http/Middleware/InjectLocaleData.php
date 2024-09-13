<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class InjectLocaleData
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $languageCode = App::currentLocale();

        $localesPath = base_path('lang'); 
        $languageFilePath = "{$localesPath}/{$languageCode}.json"; 

        if (file_exists($languageFilePath)) { 
            $data = json_decode (file_get_contents($languageFilePath), true); 
        } else { 
            $englishFilePath = "{$localesPath}/en.json";
            $data = json_decode(file_get_contents($englishFilePath), true); 
            $languageCode = 'en' ; 
        } 

        inertia()-> share('localeData', [ 
            'translate' => $data , 
            'languageCode' => $languageCode , 
        ]);

        return $next($request);
    }
}
