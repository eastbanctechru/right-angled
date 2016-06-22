import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {AirportsService} from '../airportsService';
import {NgPagedListService} from '../../right-angled/index';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { MasterDetailSampleComponent } from './master-detail-sample.component';

describe('Component: MasterDetailSample', () => {
  it('should create an instance', () => {
    let component = new MasterDetailSampleComponent(new AirportsService(), new NgPagedListService());
    expect(component).toBeTruthy();
  });
});

