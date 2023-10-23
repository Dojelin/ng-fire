import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GalleryService } from '../gallery.service';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css'],
})
export class GalleryListComponent implements OnInit, OnDestroy {
  images: Observable<any[]>;

  imagesSubscription: Subscription;

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.getImages();
  }

  getImages() {
    this.images = this.galleryService.getImages();
    this.imagesSubscription = this.images.subscribe((img) => console.log(img));
  }

  ngOnDestroy(): void {
    this.imagesSubscription.unsubscribe();
  }
}
