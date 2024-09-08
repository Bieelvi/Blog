<?php

namespace App\Enum;

enum RoleUserEnum: string
{
    case ADMIN = 'Admin';
    case COMUM = 'Comum';
    case MODERATOR = 'Moderator';
}
