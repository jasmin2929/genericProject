import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { CsvComponent } from './csv.component';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { of } from 'rxjs';
import { Settings } from '../settings';

fdescribe('CSV_COMPONENT', () => {
  let component: CsvComponent;
  let fixture: ComponentFixture<CsvComponent>;

  //mock notification
  let notificationServiceSpy = jasmine.createSpyObj(NotificationService, ['openSnackBar']);
  notificationServiceSpy.openSnackBar.and.returnValue(of());

  //mock translation
  let translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant']);
  translateServiceSpy.instant.and.returnValue(of());

  //for fileInputValidator()
  let csvData;
  let csvFileValid: File;
  let csvFileListValid: FileList;
  let csvFileInvalid: File;
  let csvFileListInvalid: FileList;
  const getFileList = (file) => {
    const dt = new DataTransfer();
    dt.items.add(file);
    return dt.files;
  };

  //for readCSV()
  let csvColumnList;
  let csvRowList;
  let mockedData;

  let data;

  //for fileContentValidator()
  let fileInputListBorder = [
    [],
    ["data"]
  ]
  let fileInputListHappy = ["data", "data"];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvComponent ],
      providers: [
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: TranslateService, useValue: translateServiceSpy },
        Settings
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(async () => {
    //for fileInputValidator()
    csvData = `id, device_id, service_request_id, device_Serial_number, date\n1, 12682, 473829, 121, 01.01.2022\n2, 12682, 473830, 232, 01.02.2022`;
    csvFileValid = new File([csvData], "test.csv", { type: 'text/csv' });
    csvFileListValid = getFileList(csvFileValid);
    csvFileInvalid = new File([csvData], "test.csv", { type: 'text/html' });
    csvFileListInvalid = getFileList(csvFileInvalid);

    //for readCSV()
    csvColumnList = ['id, device_id, service_request_id, device_Serial_number, date'];
    csvRowList = [['1, 12682, 473829, 121, 01.01.2022'],['2, 12682, 473830, 232, 01.02.2022']];
    mockedData = {csvColumnList, csvRowList};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /*
  describe('readCSV()', async () => {
    //testing promise
    it('should return struct of columnArray and rowsArray', (done) => {
      spyOn(component, 'fileContentValidator').and.returnValue(true);
      component.readCSV(csvFileValid).then((result) => {
        expect(result).toEqual(mockedData);
        done();
      });
    });
  });
  */
  describe('fileInputValidator()', () => {
    it('should return that fileInput is valid', () =>  {
      let valid = component.fileInputValidator(csvFileListValid);
      expect(valid).toEqual(true);
    });
    it('should return that fileInput is invalid', () =>  {
      let valid = component.fileInputValidator(csvFileListInvalid);
      expect(valid).toEqual(false);
    });
  });

  describe('fileContentValidator()', () => {
    it('should return that fileContent is invalid', () =>  {
      let valid;
      for(var x=0; x<fileInputListBorder.length; x++){
        valid = component.fileContentValidator(fileInputListBorder[x]);
        expect(valid).toEqual(false);
      }
    });
    it('should return that fileContent is valid', () =>  {
      let valid = component.fileContentValidator(fileInputListHappy);
      expect(valid).toEqual(true);
    });
  });

  describe('downloadCSV()', () => {
    it('should download data as csv file', () => {
      const spyObj = jasmine.createSpyObj('a', ['click']);
      spyOn(document, 'createElement').and.returnValue(spyObj);

      component.downloadCSV(csvColumnList, csvRowList);

      expect(document.createElement).toHaveBeenCalledTimes(1);
      expect(document.createElement).toHaveBeenCalledWith('a');

      expect(spyObj.download).toBe('myFile.csv');
      expect(spyObj.click).toHaveBeenCalledTimes(1);
      expect(spyObj.click).toHaveBeenCalledWith();
    });
  });
});
