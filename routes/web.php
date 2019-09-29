<?php

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

Route::get('/fastfood', function () {
    return view('fastfood/index');
});

Route::get('/dashboard', function () {
    return view('dashboard/index');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
