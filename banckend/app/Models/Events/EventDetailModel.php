<?php

namespace App\Models\Events;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class EventDetailModel extends Model
{
    use HasFactory;
    protected $table = "tb_detail_events";
    public $timestamps  = false;

    protected $fillable = [
      'eventId', 'productId', 'paymentId', 'amount', 'price', 'total', 'balance', 'advance', 'info','paymentDate',
    ];

    protected $appends = [
        'product',
        'payment'
    ];

    public function getProductAttribute() {
        return $this->hasOne('App\Models\products\Products', 'id', 'productId')->first();
    }

    public function getPaymentAttribute() {
        return DB::table('payment_methods')->where('id', $this->paymentId)->first();
    }

}
