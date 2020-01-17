import { Component, OnInit } from '@angular/core';
import {SERVER_URL, FAQ_PAGE_ENDPOINT, CONTENT_FRAGMENT_LIST_COMPONENT} from '../../providers/config';
import {Api} from '../../providers/api/api'
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FAQPage implements OnInit {

      public faqs: Array<{faq: any}> = [];
      private items: any;
      public title: string;
      public text: string;
      public itemsOrder: any;
      private shownGroup: any;
      private body: any;

        constructor(private api: Api) {
            console.log("In FAQPage constructor");
            this.api.get(FAQ_PAGE_ENDPOINT).subscribe((res)=>{
                this.body = res.body;
                this.itemsOrder = this.body[':items']['root'][':itemsOrder'];
                this.items = this.body[':items']['root'][':items'];
                if(this.items['title'] != null){
                  this.title = this.items['title']['text'];
                }
                if(this.items['text'] != null){
                  this.text = this.items['text']['text'];
                }

                this.itemsOrder.forEach(function(itemKey) {
                    var currItem = this.items[itemKey];
                    if(currItem[':type'] === CONTENT_FRAGMENT_LIST_COMPONENT){
                      var faqArray = currItem['items'];
                      faqArray.forEach(function(faqObj) {
                        this.faqs.push({faq: faqObj});
                      }, this);
                    }
                }, this);

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

        ngOnInit() {
  }

}
