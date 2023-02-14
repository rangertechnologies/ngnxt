import { Component, OnInit,Output,EventEmitter, Input ,ElementRef} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Output() uploaded = new EventEmitter<any>();
  @Input()  title: string = '';
  @Input()  errorMesg: string ='';
  @Input()  fileType: string[] = ['pdf', 'jpg','png', 'jpeg','imgage/png', 'application/pdf', 'image/jpeg', 'image/jpg'];
  @Input()  isRequired = false;
  public fileExceededLimit: boolean = false;
  public fileTypeIncorrect: boolean = false; //zak added for file upload
  public updateButtonClicked: boolean = false; //zak added for file upload
  public flyerToAttachPos: number = 0;
  public flyerToDeletePos: number = 0;
  public flyerToAttachPosstringForm: string = "";
    //File Upload 
    filesInUploading: any[] = [];
   
    constructor(private el: ElementRef) {}
  
  ngOnInit() {}
  
  onFileDropped($event:any, pos:any) {
    this.prepareFilesList($event, pos);
    console.log('filedrop',$event);
    const dropData = $event;
    this.uploaded.emit(dropData);
  }
       /**
   * handle file from browsing
   */
       fileBrowseHandler(target:any, pos: any) { // Incase it was throwing error we remove the error as soon as the file is uploaded or selected
        this.prepareFilesList(target.files, pos); 
        console.log('click upload',target.files);
        const uploadedData = target.files;
        this.uploaded.emit(uploadedData);
      
      }

  prepareFilesList(files: Array<any>, pos: any) {
    this.fileExceededLimit = false;
    this.fileTypeIncorrect = false;
    // Check  if file uploaded is only of specific format
    if(['pdf', 'png', 'jpg', 'jpeg', 'application/pdf', 'image/png', 'image/jpeg', 'image/jpg'].includes(files[0].type)){
      //Check if file size is not more than specific size
      if(files[0].size < 3242880){
        for (const item of files) {
          item.progress = 0;
          this.flyerToAttachPos = pos;
          this.flyerToAttachPosstringForm = this.flyerToAttachPos.toString();
          this.filesInUploading.push({'item':item,'pos':pos}); // pos indicates the flyer's index position
        }
        this.uploadFilesSimulator(0);
      }
      else{
        this.fileExceededLimit = true;
      }
    }
    else{
      this.fileTypeIncorrect = true;
    }
  }

    /**
   * Simulate the upload process and show the progress bar, but just add the files to  the list of array 
   */
    uploadFilesSimulator(index: number) {
      const uploadTimeOut = setTimeout(() => {
        if (index === this.filesInUploading.length) {
          // this.filesInUploading.length = 0;
          return;
        } else {
          const progressInterval = setInterval(() => {
            if (this.filesInUploading[index].item.progress === 100) {
              clearInterval(progressInterval);
              this.uploadFilesSimulator(index + 1);
            } else {
              this.filesInUploading[index].item.progress += 5;
            }
          }, 200);
        }
        clearTimeout(uploadTimeOut);
      }, 800);
    }
     /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes:any, decimals:any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

    /**
   * Delete file from files list
   * @param index (File index)
   */
    deleteFile(index: number) {
      this.filesInUploading.splice(index, 1);
    }

}
