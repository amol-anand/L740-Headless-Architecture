import { Component, OnInit } from '@angular/core';
import {SERVER_URL, SPEAKERS_ENDPOINT, CONTENT_FRAGMENT_LIST_COMPONENT} from '../../providers/config';
import {Api} from '../../providers/api/api'
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-conference-speakers',
  templateUrl: './conference-speakers.page.html',
  styleUrls: ['./conference-speakers.page.scss'],
})
export class ConferenceSpeakersPage implements OnInit {

      public speakers: Array<{speaker: any}> = [];
      private items: any;
      public title: string;
      public text: string;
      public itemsOrder: any;
      private shownGroup: any;
      private body: any;

      constructor(private api: Api) {
          console.log("In Summit Speakers constructor");
          this.api.get(SPEAKERS_ENDPOINT).subscribe((res)=>{
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
                    // console.log("currItem: "+JSON.stringify(currItem));
                    var speakerArray = currItem['items'];
                    speakerArray.forEach(function(speakerObj) {
                      this.speakers.push({speaker: speakerObj});
                    }, this);
                  }
              }, this);

          }, (err)=>{
              console.error("Error getting Speakers: "+err.message);
          });
      }

      getImage(image: string): string{
          return SERVER_URL+image;
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
