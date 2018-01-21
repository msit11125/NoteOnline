export class Note {
  public NoteID: string;
  public NoteTitle: string;
  public GuestName: string;
  public NotePhoto: string;
  public NotePhotoFile: File;
  public TypeID: number;
  public TypeName: string;
  public CreateDate: Date;
  public LastUpdateDate: Date;
  public Details: string;
  public Tags: string[] = [];

}
