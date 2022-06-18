<?php

namespace App\Models\Events;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EventDetailClass
{
    public static function create(Request $request, $eventId) {
        try {
            $detail     = (object)$request->input('detail');
            EventDetailModel::create([
                'eventId'       => $eventId,
                'productId'     => $detail->productId ?? null,
                'paymentId'     => $detail->paymentId ?? null,
                'amount'        => $detail->amount ?? 1,
                'price'         => $detail->price ?? $detail->total ?? 0,
                'total'         => $detail->total ?? 0,
                'balance'       => $detail->balance ?? 0,
                'advance'       => $detail->advance ?? 0,
                'info'          => $detail->info ?? null,
                'paymentDate'   => $detail->paymentDate ?? Date('Y-m-d')
            ]);
        }catch (\Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage());
        }
    }
    public static function update(Request $request) {
        try {
            $detail                     = (object)$request->input('detail');
            $eventDetail                = EventDetailModel::where('id', $detail->id)->first();
            $eventDetail->productId     = $detail->productId ?? $eventDetail->productId;
            $eventDetail->paymentId     = $detail->paymentId ?? $eventDetail->paymentId;
            $eventDetail->price         = $detail->price ?? $request->total ?? $eventDetail->total;
            $eventDetail->total         = $detail->total ?? $eventDetail->total;
            $eventDetail->balance       = $detail->balance ?? $eventDetail->balance;
            $eventDetail->advance       = $detail->advance ?? $eventDetail->advance;
            $eventDetail->info          = $detail->info ?? $eventDetail->info;
            $eventDetail->save();

        }catch (\Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage());
        }
    }
}
