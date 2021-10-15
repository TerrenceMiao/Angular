import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { GitHubRepository } from './model/github.repository';
import { GitHubService } from './service/github.service';
import { asyncData } from './testing/async-observable-helpers';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  let getReposSpy: jasmine.Spy;

  beforeEach(async () => {
    const gitHubService = jasmine.createSpyObj('GitHubService', ['getRepos']);
    getReposSpy = gitHubService.getRepos.and.returnValue(asyncData([new GitHubRepository()]));

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule,
      ],
      providers: [
        {
          provide: GitHubService,
          useValue: gitHubService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'starter'`, () => {
    expect(component.title).toEqual('starter');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('starter app is running!');
  });

  it('should invoke getRepos()', () => {
    fixture.detectChanges();
    expect(getReposSpy.calls.any()).withContext( 'getRepos() should be called').toBe(true);
  });
});
