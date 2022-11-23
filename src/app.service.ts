import { BadRequestException, Injectable } from '@nestjs/common';
import Ajv2019 from 'ajv/dist/2019';
import { JTDDataType } from 'ajv/dist/jtd';
import * as attendanceEventSchema from './schema/attendance.schema.json';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

@Injectable()
export class AppService {
  validate: any;
  csvWriter: any;

  constructor() {
    const ajv = new Ajv2019();
    type PreAdapterInput = JTDDataType<typeof attendanceEventSchema>;
    this.validate = ajv.compile<PreAdapterInput>(attendanceEventSchema);
    this.csvWriter = createCsvWriter({
      path: 'src/ingested-data/attendance.csv',
      header: [
        { id: 'id', title: 'ID' },
        { id: 'schoolId', title: 'School' },
        { id: 'count', title: 'Count' },
        { id: 'grade', title: 'Grade' },
      ],
      append: true,
    });
  }

  async verifyAndInsert(data: any): Promise<string> {
    const isValidPreAdapterEvent = this.validate(data);
    if (!isValidPreAdapterEvent) {
      throw new BadRequestException(this.validate.errors);
    } else {
      // append into CSV at ingested-data using csvWriter
      const records = [];
      records.push(data);
      return this.csvWriter.writeRecords(records).then(() => {
        return 'Success';
      });
    }
  }
}
