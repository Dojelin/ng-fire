import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit, OnDestroy {
  postDataSubscription: Subscription;
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.postDataSubscription = this.postService
      .getPostData(id)
      .subscribe((post) => (this.post = post));
  }

  ngOnDestroy(): void {
    this.postDataSubscription.unsubscribe();
  }
}
