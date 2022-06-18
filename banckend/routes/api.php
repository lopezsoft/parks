<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
    Route::get('roles', 'AuthController@roles');
    Route::post('loginclient', 'AuthController@loginclient');
    Route::post('signup', 'AuthController@signup');
    Route::post('updateuser', 'AuthController@updateuser');
    Route::post('register', 'AuthController@registercustomer');

    Route::group(['middleware' => 'auth:sanctum'], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::group(['prefix' => 'report'], function () {
    Route::get('cashclosing', 'ReportController@CashClosing');
    Route::get('getticketservices', 'ReportController@getTicketServices');
    Route::get('getticketfastfood', 'ReportController@setTicketFastFood');
    Route::get('settickets', 'ReportController@setTickets');
});

Route::group(['prefix' => 'clients'], function () {
   Route::get('all', 'ClientsController@getAll');
});
Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::group(['prefix' => 'events'], function () {
       Route::post('create', 'EventsController@create');
       Route::get('read', 'EventsController@read');
       Route::get('output/{id}', 'EventsReportController@output');
       Route::get('read/{id}', 'EventsController@read');
       Route::put('update/{id}', 'EventsController@update');
       Route::delete('destroy/{id}', 'EventsController@destroy');
    });
});

Route::group(['prefix' => 'master'], function () {
    Route::get('ckecksession/{id}', 'MasterController@checkClosingSession');
    Route::get('getdata', 'MasterController@getTable');
    Route::get('getsalesservice', 'MasterController@getSalesService');
    Route::get('getcashsessions', 'MasterController@getCashSessions');
    Route::get('getbranchservices', 'MasterController@getBranchServices');
    Route::get('getbranchfootWear', 'MasterController@getBranchFootWear');
    Route::get('getproducts', 'MasterController@getProducts');
    Route::get('getusers', 'MasterController@getUsers');
    Route::get('getpretickets', 'MasterController@getPreTickets');
    Route::post('setdata', 'MasterController@setTable');
    Route::post('setimageprod', 'MasterController@setImageProd');
    Route::post('insertdata', 'MasterController@insertData');
    Route::post('deletedata', 'MasterController@deleteData');
});
