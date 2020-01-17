import { Component, OnInit } from '@angular/core';
import {SERVER_URL, FAQ_HTTP_ENDPOINT, CONTENT_FRAGMENT_LIST_COMPONENT} from '../../providers/config';
import {Api} from '../../providers/api/api'
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-faq-assets-api',
  templateUrl: './faq-assets-api.page.html',
  styleUrls: ['./faq-assets-api.page.scss'],
})
export class FAQAssetsAPIPage implements OnInit {

        public faqs: Array<{faq: any}> = [];
        private items: any;
        public title: string;
        public text: string;
        public itemsOrder: any;
        private shownGroup: any;
        private body: any;

          constructor(private api: Api) {
              console.log("In FAQPage constructor");
              this.api.get(FAQ_HTTP_ENDPOINT).subscribe((res)=>{
                // The order is managed by the folder.
                // this.itemsOrder = res[":items"]["root"][":itemsOrder"];

                // The items are entries in an array. Each object represents an FAQ entry.
                this.faqs = res.body['entities'];

                // The title doesn't exist.
                // this.title = this.items["title"]["text"];

                // The description on the page doesn't exist.
                // this.text = this.items["text"]["text"];

                // Assume everything in this folder is an FAQ

              }, (err)=>{
                  console.error("Error getting FAQs: "+err.message);
              });
          }

          toggleGroup(group) {
              if (this.isGroupShown(group)) {
                  this.shownGroup = null;
              } else {
                  this.shownGroup = group;
              }
          }

          isGroupShown(group) {
              return this.shownGroup === group;
          }

          ngOnInit() { }
}
