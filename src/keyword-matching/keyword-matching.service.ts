import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produit } from 'src/produit/entities/produit.entity';
import { spawn } from 'child_process';
import * as path from 'path';


@Injectable()
export class KeywordMatchingService {
  constructor(
    @InjectRepository(Produit)
    private readonly produitRepository: Repository<Produit>,
  ) {}

  async performKeywordMatching(userQuery: string): Promise<any[]> {
    try {
      const jsonData = await this.fetchDataFromDatabase(); // Fetch data from the database as needed

      const matches = await this.callKeywordMatchingPythonCode(userQuery, jsonData);

      return matches;
    } catch (error) {
      throw error;
    }
  }

  async fetchDataFromDatabase(): Promise<string> {
    // Example query: Retrieve JSON data from the 'produit' table
    const query = this.produitRepository.createQueryBuilder('produit')
      .select('produit.nomP', 'jsonData')
      .getRawMany();
  
    const results = await query;
  
    const jsonData = JSON.stringify(results);
    console.log("jsonData:", jsonData); // Add this line to log the jsonData
  
    return jsonData;
  }
  
  

  async callKeywordMatchingPythonCode(userQuery: string, jsonData: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const scriptPath = path.join('C:/Users/MSI/Desktop/PFE/Realisation/Backend/marketplace/src/keyword-matching/script.py');
      console.log("scriptPath:", scriptPath);
      console.log("userQuery:", userQuery);
      console.log("jsonData:", jsonData);
  
      const pythonProcess = spawn('python', [scriptPath, userQuery, jsonData]);
  
      let outputData = '';
  
      pythonProcess.stdout.on('data', (data) => {
        outputData += data.toString();
      });
  
      pythonProcess.stderr.on('data', (data) => {
        console.error(data.toString());
      });
  
      pythonProcess.on('exit', (code) => {
        console.log("Python process exited with code:", code);
        console.log("Output data:", outputData);
  
        if (code === 0) {
          try {
            const matches = JSON.parse(outputData);
            console.log("Parsed matches:", matches);
            resolve(matches);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            reject(error);
          }
        } else {
          console.error(`Python process exited with code ${code}`);
          reject(new Error(`Python process exited with code ${code}`));
        }
      });
    });
  }
  
}
