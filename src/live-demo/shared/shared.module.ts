import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RTModule } from 'right-angled';

import { AdditionalFilterComponent } from './additional-filter/additional-filter.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { FilterAreaComponent } from './filter-area/filter-area.component';
import { BufferedFooterComponent } from './footers/buffered-footer.component/buffered-footer.component';
import { PagedFooterComponent } from './footers/paged-footer.component/paged-footer.component';
import { RegularFooterComponent } from './footers/regular-footer.component/regular-footer.component';
import { SortableHeaderComponent } from './sortable-header/sortable-header.component';
import { CodeTabComponent } from './tab/code-tab.component';
import { SampleTabComponent } from './tab/sample-tab.component';
import { TabSectionComponent } from './tab/tab-section.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [BufferedFooterComponent, RegularFooterComponent, PagedFooterComponent, SortableHeaderComponent, ToolbarComponent, FilterAreaComponent, AdditionalFilterComponent, CountryDetailsComponent, CodeTabComponent, SampleTabComponent, TabSectionComponent],
  exports: [CommonModule, FormsModule, RTModule, BufferedFooterComponent, RegularFooterComponent, PagedFooterComponent, SortableHeaderComponent, ToolbarComponent, FilterAreaComponent, AdditionalFilterComponent, CountryDetailsComponent, CodeTabComponent, SampleTabComponent, TabSectionComponent],
  imports: [CommonModule, FormsModule, RTModule]
})
export class SharedModule {
}
