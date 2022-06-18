<?php

namespace App\Models\Events;

use App\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class EventModel extends Model
{
    use HasFactory;
    protected $table =  "tb_events";

    protected $fillable = [
      'userId', 'totalPeople', 'url', 'title', 'calendar', 'start', 'end', 'allDay', 'extendedProps', 'status',
    ];

    protected $hidden =  [
      'extendedProps'
    ];

    protected $casts = [
        'extendedProps' => 'array',
    ];

    protected $appends = [
        'detail',
        'client',
        'user',
        'folio'
    ];

    public $timestamps  = false;

    public function getFolioAttribute(): string
    {
        return str_pad($this->id, 8, '0', STR_PAD_LEFT);
    }

    public function getDetailAttribute()
    {
        return $this->hasOne('\App\Models\Events\EventDetailModel', 'eventId', 'id')->first();
    }

    public function getClientAttribute() {
        return $this->hasOne('\App\User', 'id', 'userId')->first();
    }

    public function getUserAttribute() {
        $event  = DB::table('tb_events_user')->where('eventId', $this->id)->first();
        return User::where('id', $event->userId)->first();
    }

}
