
export enum AppStatus {
  HOME = 'HOME',
  AUTH = 'AUTH',
  NOTES = 'NOTES',
  SETUP = 'SETUP',
  RECORDING = 'RECORDING',
  PAUSED = 'PAUSED',
  PROCESSING_TRANSCRIPT = 'PROCESSING_TRANSCRIPT',
  EDITING = 'EDITING',
  PROCESSING_MOM = 'PROCESSING_MOM',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export type RecordingSource = 'mic' | 'screen' | 'upload';

export interface MeetingMetadata {
  title: string;
  agenda: string;
  location: string;
  platform?: 'zoom' | 'teams' | 'meet' | 'other';
  meetingLink?: string;
  meetingId?: string;
  dateTime: string;
  attendees: string; // Comma separated emails
  source: RecordingSource;
}

export interface MoMData {
  summary: string;
  actionItems: string[];
  decisions: string[];
  attendees: string[]; 
  fullContent: string; 
}

export interface MeetingResult {
  transcript: string;
  mom: string; 
  emailDraft: string; 
  audioBlob: Blob | null;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  lastModified: string;
  color: string;
}
