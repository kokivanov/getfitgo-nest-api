
import { SetMetadata } from '@nestjs/common';
import { Authorities } from '../enums';

export const AUTHORITY_KEY = 'authorities';
export const Authority = (...authorities: Authorities[]) => SetMetadata(AUTHORITY_KEY, authorities);
