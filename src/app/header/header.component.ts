import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'jworks-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() appTitle: string;
  @Output() toggle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.toggle.emit();
  }

}
