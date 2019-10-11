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
    Route::get('getticketfastfood', 'ReportController@setTicketFastFood');
    Route::get('settickets', 'ReportController@setTickets');
});

Route::group(['prefix' => 'master'], function () {
    Route::get('getdata', 'MasterController@getTable');
    Route::get('getsalesservice', 'MasterController@getSalesService');
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

