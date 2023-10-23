import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GalleryService } from '../gallery.service';

@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.css'],
})
export class GalleryDetailComponent implements OnInit, OnDestroy {
  image: any;

  getImageSubscription: Subscription;

  constructor(
    private router: ActivatedRoute,
    private galleryService: GalleryService
  ) {}

  ngOnInit(): void {
    this.getImage();
  }

  getImage() {
    const id = this.router.snapshot.paramMap.get('id');

    this.getImageSubscription = this.galleryService
      .getImage(id)
      .subscribe((image) => (this.image = image));
  }

  delete() {
    const id = this.router.snapshot.paramMap.get('id');
    const name = this.image.name;
    this.galleryService.deleteImage(id, name);
  }

  ngOnDestroy(): void {
    this.getImageSubscription.unsubscribe();
  }
}
