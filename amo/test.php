<?php
if (function_exists('curl_init')) {
    echo "✅ cURL работает!";
} else {
    echo "❌ cURL не включён.";
}