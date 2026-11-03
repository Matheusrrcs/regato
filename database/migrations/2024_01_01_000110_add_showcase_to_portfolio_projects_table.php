<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('portfolio_projects', function (Blueprint $table) {
            $table->string('desktop_screenshot')->nullable()->after('cover_image');
            $table->string('mobile_screenshot')->nullable()->after('desktop_screenshot');
            $table->json('gallery')->nullable()->after('mobile_screenshot');
        });
    }

    public function down(): void
    {
        Schema::table('portfolio_projects', function (Blueprint $table) {
            $table->dropColumn(['desktop_screenshot', 'mobile_screenshot', 'gallery']);
        });
    }
};
