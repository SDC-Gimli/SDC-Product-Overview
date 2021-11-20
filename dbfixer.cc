#include <fstream>
#include <string>
#include <iostream>

int main(int argc, char** argv) {
   if (argc != 3) {
      std::cout << "Usage: <program> BROKEN_CSV OUT_FIXED_CSV" << std::endl;
      return 1;
   }
   std::ifstream csv_in(argv[1]);
   std::ofstream csv_out(argv[2]);

   std::string line;
   std::getline(csv_in, line);
   csv_out << line << "\n";
   while (!csv_in.eof()) {
      std::getline(csv_in, line);
      auto comma = line.find(',', 0);
      comma = line.find(',', comma + 1);
      if (line[comma + 1] != '"') {
         line.insert(comma + 1, "\"");
         comma++;
      }
      comma = line.find(',', comma + 1);
      if (line[comma - 1] != '"') {
         line.insert(comma - 1, "\"");
         comma++;
      }

      if (line[comma + 1] != '"') {
         line.insert(comma + 1, "\"");
         comma++;
      }
      if (line.back() != '"') {
         line.push_back('"');
      }
      csv_out << line << "\n";
   }
   printf("Finished");
   return 0;
}
