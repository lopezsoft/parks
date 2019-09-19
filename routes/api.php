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
    Route::post('signup', 'AuthController@signup');
  
    Route::group(['middleware' => 'auth:api'], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::group(['prefix' => 'general'], function () {
    Route::get('getcountries', 'general\GeneralController@getCountries');
});

Route::group(['prefix' => 'company'], function () {
    Route::get('getcompany', 'dashboard\CompanyController@getCompany');
    Route::post('setcompany', 'dashboard\CompanyController@setCompany');

    Route::get('getbranchoffices', 'dashboard\CompanyController@getBranchOffices');
    Route::post('setbranchoffices', 'dashboard\CompanyController@setBranchOffices');
});

Route::group(['prefix' => 'products'], function () {
    Route::get('getproducts', 'products\ProductsController@getProducts');
    Route::post('setproducts', 'products\ProductsController@setProducts');

    Route::get('getlines', 'products\ProductsController@getLines');
    Route::post('setplines', 'products\ProductsController@setLines');

    Route::get('getcategories', 'products\ProductsController@getCategories');
    Route::post('setcategories', 'products\ProductsController@setCategories');
});