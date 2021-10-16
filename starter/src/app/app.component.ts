import { Component } from '@angular/core';

import { GitHubService } from './service/github.service';
import { GitHubRepository } from './model/github.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'starter';

  username: string = "TerrenceMiao"
  repos: GitHubRepository[] | undefined;
  loading: boolean = false;
  errorMessage: any;

  constructor(private githubService: GitHubService) {
  }

  ngOnInit(): void {
    this.getRepos();
  }

  getRepos() {
    this.loading = true;
    this.errorMessage = "";
    this.githubService.getRepos(this.username)
      .subscribe(
        (response) => {
          // next() callback
          console.log('response received');
          this.repos = response;
        },
        (error) => {
          // error() callback
          console.error('Request failed with error');
          this.errorMessage = error;
          this.loading = false;
        },
        () => {
          // complete() callback
          console.log('Request completed');
          this.loading = false;
        }
      )
  }
}
