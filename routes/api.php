<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('loginclient', 'AuthController@loginclient');
    Route::post('signup', 'AuthController@signup');
    Route::post('register', 'AuthController@registercustomer');
  
    Route::group(['middleware' => 'auth:api'], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::group(['prefix' => 'report'], function () {
    Route::get('getticketservices', 'ReportController@getTicketServices');

});

Route::group(['prefix' => 'master'], function () {
    Route::get('getdata', 'MasterController@getTable');
    Route::get('getsalesservice', 'MasterController@getSalesService');
    Route::post('setdata', 'MasterController@setTable');
    Route::post('insertdata', 'MasterController@insertData');
    Route::post('deletedata', 'MasterController@deleteData');
});

