import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member: Member;
  user: User;
  @ViewChild('editForm') editForm : NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event:any){
    if (this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  constructor(private accountService : AccountService,
     private memebersService: MembersService,
     private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(currentUser => this.user = currentUser);
   }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memebersService.getMember(this.user.userName).subscribe(user =>{
      this.member = user;
    });
  }

  UpdateMember(){
    this.memebersService.updateMember(this.member).subscribe(() =>{
      this.toastr.success('Profile updated successfully');
      this.editForm.reset(this.member);// to disable the button and hide th alerte when we submit the form
    })
  }
}


