import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx';
import db from './db';

export const exportToExcel = async () => {
  const members = await getTable('members');
  const savings = await getTable('savings');
  const loans = await getTable('loans');

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(members), 'Members');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(savings), 'Savings');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(loans), 'Loans');

  const uri = `${FileSystem.documentDirectory}SACCO_Backup.xlsx`;
  const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
  const base64 = btoa(
    new Uint8Array([...Buffer.from(wbout, 'binary')]).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  );
  await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
  alert(`✅ Exported to: ${uri}`);
  return uri;
};

export const importFromExcel = async (refreshMembers) => {
  const result = await DocumentPicker.getDocumentAsync({
    type: 'application/vnd.openxml
