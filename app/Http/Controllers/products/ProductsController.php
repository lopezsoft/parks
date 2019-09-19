<?php

namespace App\Http\Controllers\products;

use App\models\products\Products;
use App\models\products\Lines;
use App\models\products\Categories;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductsController extends Controller
{
    
    public function getProducts()
    {
        $select = Products::all();
        echo $this->json_response($select->toArray(), 0);
    
    }

    public function setProducts(Request $request)
    {
        $fiels  = json_decode($request->input('records'));
        $up = Products::find(1);
        foreach ($fiels as $key => $value) {
            $up->$key   = $value;
        }
        $up->save();
        echo $this->json_response($up->toArray(),0);
    }


    public function getLines()
    {
        $select = Lines::all();
        echo $this->json_response($select->toArray(), 0);
    
    }

    public function setLines(Request $request)
    {
        $fiels  = json_decode($request->input('records'));
        $up = Lines::find(1);
        foreach ($fiels as $key => $value) {
            $up->$key   = $value;
        }
        $up->save();
        echo $this->json_response($up->toArray(),0);
    }

    public function getCategories()
    {
        $select = Categories::all();
        echo $this->json_response($select->toArray(), 0);
    
    }

    public function setCategories(Request $request)
    {
        $fiels  = json_decode($request->input('records'));
        $up = Categories::find(1);
        foreach ($fiels as $key => $value) {
            $up->$key   = $value;
        }
        $up->save();
        echo $this->json_response($up->toArray(),0);
    }


}
