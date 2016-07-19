import { PagedPager, BufferedPager, SimplePager } from 'e2e4';
import { Injectable } from '@angular/core';

@Injectable()
export class NgPagedPager extends PagedPager { }
@Injectable()
export class NgBufferedPager extends BufferedPager { }
@Injectable()
export class NgSimplePager extends SimplePager { }
