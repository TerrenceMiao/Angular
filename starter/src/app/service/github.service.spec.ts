import { HttpErrorResponse } from "@angular/common/http";
import { defer } from "rxjs";
import { GitHubRepository } from "../model/github.repository";
import { asyncData, asyncError } from "../testing/async-observable-helpers";
import { GitHubService } from "./github.service";

describe('GitHubService', () => {

  let httpClientSpy: { get: jasmine.Spy };
  let gitHubService: GitHubService;
  let userName = 'me';

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    gitHubService = new GitHubService(httpClientSpy as any);
  });

  it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
    const expectedGitHubRepositories: GitHubRepository[] = [
      { id: '1', name: 'A', html_url: 'https://github.com/me/A', description: 'A description' },
      { id: '2', name: 'B', html_url: 'https://github.com/me/B', description: 'B description' },
    ];

    httpClientSpy.get.and.returnValue(asyncData(expectedGitHubRepositories));

    gitHubService.getRepos(userName).subscribe(
      gitHubRepositories => {
        expect(gitHubRepositories)
          .withContext('GitHubRepositories doesnt match ' + expectedGitHubRepositories)
          .toEqual(expectedGitHubRepositories);
        done();
      },
      done.fail,
    );

    expect(httpClientSpy.get.calls.count())
      .withContext('Should make one call')
      .toBe(1);
  });

  it('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    gitHubService.getRepos(userName).subscribe(
      gitHubRepositories => done.fail('expected an error, not gitHubRepositories'),
      error  => {
        expect(error.message).toContain('test 404 error');
        done();
      },
    );
  });
})

