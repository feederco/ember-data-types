import StringTransform from '../../transform/string';
import BooleanTransform from '../../transform/boolean';
import NumberTransform from '../../transform/number';
import DateTransform from '../../transform/date';

// Ideally we'd have this extend Record<string, DS.Transform> since this should really only contain transforms.
// However, there are a number of existing apps where the return type is just directly registered here.
export default interface TransformRegistry {
    string: StringTransform;
    boolean: BooleanTransform;
    number: NumberTransform;
    date: DateTransform;
}
