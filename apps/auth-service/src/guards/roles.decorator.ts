import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client-auth';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
