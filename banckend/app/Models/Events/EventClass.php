<?php

namespace App\Models\Events;

use App\Contracts\CrudContract;
use App\Traits\MessagesTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EventClass implements CrudContract
{
    public function create(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            DB::beginTransaction();
            $user       = Auth::user();
            $event      = EventModel::create([
                'userId'        => $request->client['id'] ?? null,
                'totalPeople'   => $request->totalPeople ?? 0,
                'url'           => $request->url ?? '',
                'title'         => $request->title ?? null,
                'calendar'      => $request->calendar ?? null,
                'start'         => $request->start ?? null,
                'end'           => $request->end ?? null,
                'allDay'        => $request->allDay ?? false,
                'extendedProps' => json_encode($request->extendedProps) ?? [],
                'status'        => $request->status ?? 1
            ]);

            DB::table('tb_events_user')->insert([
                'eventId'   => $event->id,
                'userId'    => $user->id
            ]);

            EventDetailClass::create($request, $event->id);
            DB::commit();
            $event  = EventModel::where('id', $event->id)->first();
            return MessagesTrait::getResponse201([
                'records' => $event
            ]);
        }catch (\Exception $e) {
            DB::rollBack();
            return MessagesTrait::getResponse500([
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function read(Request $request, $id = null): \Illuminate\Http\JsonResponse
    {
        $query  = EventModel::query();
        if($id) {
            $query->where('id', $id);
        }
        $query  = $query->where('status', 1);
        return MessagesTrait::getResponse([
            'records' => $query->get()
        ]);
    }

    public function update(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        try {
            DB::beginTransaction();
            $event                  = EventModel::where('id', $id)->first();
            $event->userId          = $request->client->id ?? $event->userId;
            $event->totalPeople     = $request->totalPeople ?? $event->totalPeople;
            $event->url             = $request->url ?? $event->url;
            $event->title           = $request->title ?? $event->title;
            $event->calendar        = $request->calendar ?? $event->calendar;
            $event->start           = $request->start ?? $event->start;
            $event->end             = $request->end ?? $event->end;
            $event->allDay          = $request->allDay ?? $event->allDay;
            $event->extendedProps   = json_encode($request->extendedProps) ?? $event->extendedProps;
            $event->save();
            EventDetailClass::update($request);
            DB::commit();
            $event  = EventModel::where('id', $event->id)->first();
            return MessagesTrait::getResponse([
                'records' => $event
            ]);
        }catch (\Exception $e) {
            DB::rollBack();
            return MessagesTrait::getResponse500([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function destroy(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        try{
            $event          = EventModel::where('id', $id)->first();
            $event->status  = 2;
            $event->save();
            return MessagesTrait::getResponse([
               'records' => $event
            ]);
        }catch (\Exception $e) {
            DB::rollBack();
            return MessagesTrait::getResponse500([
                'error' => $e->getMessage()
            ]);
        }
    }
}
