'use client';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/use-debounce';
import { Search } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import queryString from 'query-string';

const SearchInput = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const categoryId = searchParams.get('categoryId');
  const name = searchParams.get("name");

  // set the serch value to the value of the name query param
  //1 set the input value to state
  const [value, setValue] = useState(name || "");

  // set the value to debounced value

  
  const debounceValue = useDebounce<string>(value, 500);


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  //    2 set the value to the query param
  useEffect(() => {
    const query = {
      name: debounceValue,
      categoryId: categoryId,
    };
    // generate the url and push it to the router to selecte the items

    const url = queryString.stringifyUrl({
      url: window.location.href,
      query: query,
    },{skipEmptyString:true,skipNull:true});
    router.push(url);
  }, [debounceValue, categoryId, router]);

  return (
    <div className="relative">
      <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
      <Input onChange={onChange} value={value}
      className="pl-10 bg-primary/10" placeholder="Search for a hero" />
    </div>
  );
};

export default SearchInput;
