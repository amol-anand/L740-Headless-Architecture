import { Component, OnInit } from '@angular/core';
import {SERVER_URL, CONTRIBUTORS_ENDPOINT, IMAGE_COMPONENT, TEXT_COMPONENT, TITLE_COMPONENT} from '../../providers/config';
import {Api} from '../../providers/api/api'
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.page.html',
  styleUrls: ['./contributors.page.scss'],
})
export class ContributorsPage implements OnInit {

        public contributors: Array<{contributor: any}> = [];
        private body: any;
        public contributorItems: any;
        private xfitems: any;
        public xfitemsOrder: any;

          constructor(private api: Api) {
              console.log("In ContributorsPage constructor");
              this.api.get(CONTRIBUTORS_ENDPOINT).subscribe((res)=>{
                  this.body = res.body;
                  this.contributorItems = this.body['contributors'];
                  this.contributorItems.forEach(function(itemKey) {
                      var title = itemKey['title'];
                      var path = itemKey['path'];
                      console.log("title: ",title);
                      console.log("path: ",path);
                      var xfJsonPath = path + '/master.model.json';
                      this.api.get(xfJsonPath).subscribe((xfRes)=>{
                        this.xfBody = xfRes.body;
                        this.xfitemsOrder = this.xfBody[':items']['root'][':items']['responsivegrid'][':itemsOrder'];
                        this.xfitems = this.xfBody[':items']['root'][':items']['responsivegrid'][':items'];
                        var imageval: any;
                        var textval: any;
                        var titleval: any;
                        var subtitleval: any;
                        this.xfitemsOrder.forEach(function(itemKey) {
                            var currItem = this.xfitems[itemKey];
                            if(currItem[':type'] === TITLE_COMPONENT){
                              if(titleval === undefined){
                                titleval = currItem['text'];
                              } else{
                                subtitleval = currItem['text'];
                              }
                            }
                            if(currItem[':type'] === IMAGE_COMPONENT){
                              imageval = currItem['src'];
                            }
                            if(currItem[':type'] === TEXT_COMPONENT){
                              if(textval === undefined){
                                textval = currItem['text'];
                              } else{
                                textval = textval + ", " + currItem['text'];
                              }
                            }
                        }, this);
                        this.contributors.push(
                          {
                            contributor: {
                              text: textval,
                              image: imageval,
                              title: titleval,
                              subtitle: subtitleval
                            }
                          }
                        );
                      }, this);
                  }, this);
              }, (err)=>{
                  console.error("Error getting Contributors: "+err.message);
              });
          }

          toggleGroup(group) {
              if (this.isGroupShown(group)) {
                  this.shownGroup = null;
              } else {
                  this.shownGroup = group;
              }
          }

          getImage(image: string): string{
              return SERVER_URL+image;
          }

          isGroupShown(group) {
              return this.shownGroup === group;
          }

          ngOnInit() {
          }
}
