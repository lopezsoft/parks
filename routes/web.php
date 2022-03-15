<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/', function () {
    return view('index');
});

Route::get('/parks', function () {
    return view('parks/index');
});

Route::get('/client/register', function () {
    return view('users/customer_registration');
});

Route::get('/client/services', function () {
    return view('users/index');
});

Route::get('/client/terms', function () {
    return view('users/terms');
});

Route::get('/dashboard', function () {
    return view('dashboard/index');
});

Route::get('/dashboard/login', function () {
    return view('dashboard/login');
});

// Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
