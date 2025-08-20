import { Component } from '@angular/core';
import { Formation } from '../../models/Formation';
import { ActivatedRoute, Router } from '@angular/router';
import { ActualitemanagmentService } from '../../service/actualitemanagment.service';

@Component({
  selector: 'app-showformationdetail',
  templateUrl: './showformationdetail.component.html',
  styleUrls: ['./showformationdetail.component.scss']
})
export class ShowformationdetailComponent {
  formation!: Formation;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formationService: ActualitemanagmentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.formationService.getFormationById(id).subscribe(data => {
      this.formation = data;
    });
  }

  getImageUrl(imagePath: string): string {
    return 'http://localhost:8085/api/micro-formation/get-file/' + imagePath.replace('/downloadFile/', '');
  }


}
